import * as z from 'zod';

export const profileSchema = z.object({
  firstname: z.string().min(2, { message: 'Informe seu nome.' }),
  lastname: z.string().min(2, { message: 'Informe seu sobrenome.' }),
  email: z.string().email({ message: 'Informe um e-mail válido.' }),
  contactno: z.coerce.number({ invalid_type_error: 'Informe um telefone válido.' }),
  country: z.string().min(1, { message: 'Selecione um país.' }),
  city: z.string().min(1, { message: 'Selecione uma cidade.' }),
  jobs: z.array(
    z.object({
      jobcountry: z.string().min(1, { message: 'Selecione o país.' }),
      jobcity: z.string().min(1, { message: 'Selecione a cidade.' }),
      jobtitle: z.string().min(2, { message: 'Informe o cargo.' }),
      employer: z.string().min(2, { message: 'Informe a empresa.' }),
      startdate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Use o formato AAAA-MM-DD.'
      }),
      enddate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Use o formato AAAA-MM-DD.'
      })
    })
  )
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
