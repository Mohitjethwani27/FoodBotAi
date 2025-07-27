const { z } = require("zod");

const leadSchema = z.object({
  name: z.string(),
  source: z.enum([
    "cold_call",
    "instagram",
    "referral",
    "event",
    "website",
    "inbound_call",
    "whatsapp",
  ]),
  contact: z
    .object({
      email: z.string().email().nullable().optional(),
      phone: z.string().nullable().optional(),
    })
    .optional(),
  interestedProducts: z.array(z.string()),
  status: z.string().optional(),
  notes: z.string().optional(),
  createdBy: z.string().optional(), 
});

module.exports = leadSchema;
