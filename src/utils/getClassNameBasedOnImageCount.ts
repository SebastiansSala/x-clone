export default function getClassNameBasedOnImageCount(imageCount: number) {
  switch (imageCount) {
    case 1:
      return "row-span-2 col-span-2"
    case 2:
    case 3:
      return "col-span-1 row-span-2"
    case 4:
      return "col-span-1 row-span-1"
    default:
      return ""
  }
}
