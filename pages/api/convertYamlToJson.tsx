import yaml from "js-yaml";
export default (req: { method: string; body: { data: string; }; }, res: { status: (arg0: number) => {json: { (arg0: string | number  | null | undefined | {}): void }; }; }):void => {
  if (req.method === "POST") {
    const doc = yaml.load(req.body.data);
    res.status(200).json(doc);
  } else {
    res.status(200).json("working");
  }
};
