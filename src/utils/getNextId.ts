export default function getNextId(object: any, max_per_take: number) {
  return object.length < max_per_take ? undefined : object[object.length - 1].id
}
