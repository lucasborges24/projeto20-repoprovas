import joi from "joi";

export const testSchema = joi.object({
  name: joi.string().max(263).required().trim(),
  pdfUrl: joi
    .string()
    .pattern(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    )
    .required(),
  category: joi.string().max(263).required().trim(),
  discipline: joi.string().max(263).required().trim(),
  teacher: joi.string().max(263).required().trim(),
});
