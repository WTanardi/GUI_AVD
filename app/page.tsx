'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';

const numberOfRadioFields = 10;

const radioTitles: string[] = [
  'Lokasi',
  'Udara',
  'Kebersihan',
  'Fasilitas',
  'Harga',
  'Variasi',
  'Pelayanan',
  'Penyajian',
  'Pembayaran',
  'Sanitasi',
];

const FormSchema = z.object(
  [...Array(numberOfRadioFields)].reduce((acc, _, index) => {
    acc[`${radioTitles[index]}`] = z.enum(['1', '2', '3', '4', '5'], {
      required_error: `You need to select an option for Type ${index + 1}.`,
    });
    return acc;
  }, {}),
);

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <h1 className='text-2xl p-8 text-center'>
        Survey Kepuasan Mahasiswa Universitas Airlangga Terhadap Fasilitas dan
        Pelayanan Kantin Kampus C
      </h1>
      <main className='container mx-auto'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex gap-4 items-center flex-wrap justify-center'
          >
            {[...Array(numberOfRadioFields)].map((_, index) => (
              <FormField
                key={index}
                control={form.control}
                name={radioTitles[index]}
                render={({ field }) => (
                  <FormItem className='items-center justify-center flex flex-col border-2 py-4 rounded-xl w-80'>
                    <FormLabel className='text-2xl'>
                      {radioTitles[index]}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex'
                      >
                        {[...Array(5)].map((_, optionIndex) => (
                          <div
                            key={optionIndex}
                            className='flex-col flex gap-2 items-center'
                          >
                            <RadioGroupItem value={`${optionIndex + 1}`} />
                            <Label htmlFor='option-two'>
                              {' '}
                              {`${optionIndex + 1}`}{' '}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div className='w-full justify-center flex'>
              <Button
                type='submit'
                className='w-80'
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </>
  );
}
