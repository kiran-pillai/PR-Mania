import { useToggle } from '@mantine/hooks';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import logo from '../../../assets/pr_mania.png';
import { useAuthContext } from '@/context/authContext';
import { urlToURI } from '@/urlHandler';
import { useNavigate } from '@tanstack/react-router';

const Login = () => {
  const [type, toggle] = useToggle(['Login', 'Register']);
  const { setUserIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const handleRegister = async ({ email, name, password }: any) => {
    const response = await fetch(
      urlToURI(type === 'register' ? 'register' : 'login'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          ...(type === 'register' && { name: name }),
        }),
      }
    );
    let data = await response.json().catch((err) => {
      console.error('error with login', err);
    });
    localStorage.setItem('accessToken', data?.accessToken);
    localStorage.setItem('refreshToken', data?.refreshToken);
    form.reset();
    setUserIsAuthenticated(true);
    navigate({ to: '/chat' });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-full">
        <img
          style={{
            width: '100%',
            height: '100vh',
            marginTop: '-1px',
            marginLeft: '-1px',
          }}
          src={logo}
          alt="logo"
        />
      </div>
      <div className="w-1/2 ">
        <div className="flex">
          <Button
            variant={'ghost'}
            className="ml-auto"
            onClick={() => toggle()}>
            {type === 'Login' ? 'Register' : 'Login'}
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="font-medium text-3xl mb-10">
            Welcome to PR Mania, {type} with
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => handleRegister(values))}
              className="space-y-8">
              {type === 'Register' && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Please enter your name"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Please enter your email"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Please enter your password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="w-150" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
