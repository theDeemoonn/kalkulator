import EmailIcon from '@/components/icon/email-icon';
import LoginLogo from '@/components/icon/login-logo';
import PasswordEye from '@/components/icon/password-eye';
import {
  TypographyBodyM,
  TypographyH1,
  TypographyMuted,
} from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 justify-center items-center',
        className
      )}
      {...props}
    >
      <Card className="overflow-hidden p-0 h-[800px] w-[1260px]">
        <CardContent className="grid p-0 h-full md:grid-cols-2">
          <form className="flex flex-col justify-center p-35">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center pb-16">
                <TypographyH1>Вход</TypographyH1>
              </div>
              <div className="grid gap-3">
                <Input
                  prefix={<TypographyBodyM>Почта</TypographyBodyM>}
                  suffix={<EmailIcon />}
                  id="email"
                  type="email"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Input
                  prefix={<TypographyBodyM>Пароль</TypographyBodyM>}
                  suffix={<PasswordEye />}
                  id="password"
                  type="password"
                  required
                />
                <Link
                  href="#"
                  className="mr-auto text-sm underline-offset-2 hover:underline decoration-fg-soft"
                >
                  <TypographyMuted className="pb-16">
                    Забыли пароль?
                  </TypographyMuted>
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  rightIcon={<ArrowRight className="text-accent-default" />}
                  type="submit"
                  className="w-full bg-fg-default"
                >
                  Войти
                </Button>
                <Button variant="outline" className="w-full">
                  <TypographyBodyM>Зарегистрироваться</TypographyBodyM>
                </Button>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <CardContent className="bg-bg-surface1 h-full w-full p-2 rounded">
              <div className="flex bg-fg-default h-full w-full justify-center items-center rounded">
                <LoginLogo />
              </div>
            </CardContent>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
