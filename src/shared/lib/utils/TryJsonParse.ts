import { type } from 'os'

export function TryJsonParse(input: any) {
  if (typeof input == "undefined" || input === null) {
    return input
  }

  if (typeof input === 'object') {
    console.log("Input is an object, so return it as it is")
    return input
  }

  try {
    switch (typeof input) {
      default:
        input = input.replace(/\\"/gi, "\"")
        break;
    }
    const o = JSON.parse(input)
    console.log("Inside Try Catch , Type of input is " + typeof input)
    if (o && typeof o === 'object') return o
  } catch (e) {
    console.log("Parse error")
    console.log(e)
  }

  return input
}
