export default function AccountDashboardHeading({ name }: { name: string }) {
  return <h2 className="hidden lg:block py-6 pb-10 text-2xl font-medium">{name}</h2>;
}
