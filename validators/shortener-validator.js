import z from "zod";

export const shortenerSchema = z.object({
  url: z
    .string({required_error: "UZL is required."})
    .trim()
    .url({
      message: "Please enter a valid URL.",
    })
    .max(1024, {message: "URL connot be longer than 1024 character."}),

  shortCode: z
    .string({required_error: "short code is required."})
    .trim()
    .min(2, {message: "short code mnust be at least 2 character long."})
    .max(50, {
      message: "Short code must not exceed 50 characters.",
    }),
   
});