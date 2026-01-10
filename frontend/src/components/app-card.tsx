import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";

export function CardDefault() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Stock info</CardTitle>

        <CardDescription>stock info.</CardDescription>
      </CardHeader>

      <CardContent>
        <p>btc:90000$</p>
      </CardContent>
      <CardFooter>hello</CardFooter>
    </Card>
  );
}
