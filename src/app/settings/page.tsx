import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ProfileNavbar from "@/components/profile-navbar";
import InfoUpdate from "./info-update";
import { Toaster } from "@/components/ui/toaster";
import ChangePass from "./change-pass";
import DeleteAccount from "./delete-acc";
export default function Page() {
  return (
    <div>
      <header>
        <ProfileNavbar />
      </header>
      <main>
        <div className="container mx-auto py-10 space-y-8">
          <h1 className="text-3xl font-bold">Account Settings</h1>

          <InfoUpdate />

          <ChangePass />

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Push Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications on your device
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Marketing Emails</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new products and features
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <DeleteAccount />
        </div>
      </main>
      <Toaster />
    </div>
  );
}
