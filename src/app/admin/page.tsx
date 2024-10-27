import { redirect } from "next/navigation";

export default function Page() {
  // Redirect to /admin/dashboard
  redirect("/admin/dashboard");

  // Optionally, return null as this component won't render anything
  return null;
}
