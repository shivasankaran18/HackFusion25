import { z } from "zod";
export const TeamLeadSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  gender: z.string(),
  regNo: z.string(),
  dept: z.string(),
  year: z.string(),
  phoneno: z.string(),
});
export const createTeamSchema = z.object({
  teamName: z.string(),
  teamLead: TeamLeadSchema,
});

export const getTeamSchema = z.object({ email: z.string().email() });

export const isinaTeamSchema = z.object({ email: z.string().email() });

// export const JoinTeamSchema = z.object({
//   teamId: z.number(),
//   memberDetails: z.object({
//     name: z.string(),
//     email: z.string().email(),
//     gender: z.string(),
//     regNo: z.string(),
//     dept: z.string(),
//     year: z.string(),
//     phoneno: z.string(),
//   }),
// });
export const JoinTeamSchema = z.object({
  teamId: z.string(),
  memberdetails: z.object({
    name: z.string(),
    email: z.string().email(),
    gender: z.string(),
    regNo: z.string(),
    dept: z.string(),
    year: z.string(),
    phoneno: z.string(),
  }),
});

export const deleteTeamSchema = z.object({ email: z.string().email() });

export const leaveTeamSchema = z.object({ email: z.string().email() });

export const SubmitSchema = z.object({
  domainId: z.string(),
  solutionTitle: z.string(),
  description: z.string(),
});

export const addDomain = z.object({
  name: z.string(),
});
