import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { type Gender, type GovernmentIdType } from "@prisma/client";

export const claimRequestRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        patientData: z.object({
          firstName: z.string(),
          lastName: z.string(),
          middleName: z.string().optional(),
          dateOfBirth: z.string(),
          gender: z.string(),
          contactNumber: z.string().optional(),
          email: z.string().optional(),
          address: z.string().optional(),
          governmentIdType: z.string().optional(),
          governmentIdNumber: z.string().optional(),
        }),
        admissionData: z.object({
          admissionDateTime: z.string(),
          dischargeDateTime: z.string(),
          patientType: z.string(),
        }),
        medicalData: z.object({
          medicalAbstract: z.string().optional(),
          finalDiagnosis: z.string().optional(),
          testResults: z.string().optional(),
        }),
        insuranceData: z.object({
          policyNumber: z.string(),
          memberName: z.string(),
          relationship: z.string(),
          hmoProvider: z.string(),
          otherHmoProvider: z.string().optional(),
          loa: z.string().optional(),
        }),
        billingData: z.object({
          soa: z.string().optional(),
          claimAmount: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Create patient record first
      try {
        return await ctx.db.$transaction(async (tx) => {
          const { id: patientId } = await tx.patient.create({
            data: {
              firstName: input.patientData.firstName,
              lastName: input.patientData.lastName,
              middleName: input.patientData.middleName,
              dateOfBirth: new Date(input.patientData.dateOfBirth),
              gender: input.patientData.gender as Gender,
              contactNumber: input.patientData.contactNumber,
              email: input.patientData.email,
              address: input.patientData.address,
              governmentIdType: input.patientData
                .governmentIdType as GovernmentIdType,
              governmentIdNumber: input.patientData.governmentIdNumber,
            },
          });

          await tx.hospitalPatient.create({
            data: {
              admissionDateTime: new Date(
                input.admissionData.admissionDateTime,
              ),
              dischargeDateTime: new Date(
                input.admissionData.dischargeDateTime,
              ),
              patientType: input.admissionData.patientType,
              patient: { connect: { id: patientId } },
            },
          });

          return tx.claim.create({
            data: {
              patient: { connect: { id: patientId } },
              claimAmount: parseFloat(input.billingData.claimAmount),
              status: "Pending",
              policyNumber: input.insuranceData.policyNumber,
              memberName: input.insuranceData.memberName,
              relationship: input.insuranceData.relationship,
              hmoProvider: input.insuranceData.hmoProvider,
              otherHmoProvider: input.insuranceData.otherHmoProvider,
              finalDiagnosisFile: input.medicalData.finalDiagnosis,
              testResultsFile: input.medicalData.testResults,
              medicalAbstractFile: input.medicalData.medicalAbstract,
              loaFile: input.insuranceData.loa,
              soaFile: input.billingData.soa,
            },
          });
        });
      } catch (error) {
        throw new Error(String(error));
      }
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.claim.findMany();
  }),
});
