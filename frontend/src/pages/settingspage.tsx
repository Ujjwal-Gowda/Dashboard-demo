import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { useThemeStore } from "../hooks/usetheme";

export default function SettingsPage() {
  const { theme, setTheme, reset } = useThemeStore();

  return (
    <div className="flex flex-col gap-6 w-full px-4 md:px-8 lg:px-12">
      <h1 className="text-2xl font-semibold">Settings</h1>

      {/* Appearance */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Theme</span>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Show chart grid</span>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Market */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Market Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm">Default currency</span>
            <Select defaultValue="USD">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="INR">INR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Data & Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm">Auto refresh data</span>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Danger */}
      <Card className="w-full border-red-300/50">
        <CardHeader>
          <CardTitle className="text-red-300">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            onClick={reset}
            className="w-full md:w-auto"
          >
            Reset all settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
