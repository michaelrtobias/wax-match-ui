const formatRequestTokenBody = (body: string): object => {
  const result = {};
  const parsedBody = JSON.parse(body);
  console.log("parsed body", parsedBody);
  const keyValueArray: string[] = parsedBody.split("&");
  keyValueArray.forEach((pair) => {
    const splitKeyValue: string[] = pair.split("=");
    result.splitKeyValue[0] = splitKeyValue[1] as string;
  });
  return result
};