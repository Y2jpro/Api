import { z } from "zod";

/*body.role, 
body.status,
  body.applied_date,
  body.notes
  company_id
*/ 

export const applicationSchema = z.object({
 role : z.string().min(2),
  status : z.string(),
  applied_date : z.string(),
  notes : z.string(),
  company_id : z.number().int().positive()
});
