export default (index: number) => {
  const names: any = {
    0: 'Unknown',
    1: 'Theoretical knowledge',
    2: 'Practical knowledge',
    3: 'Practical knowledge',
  }
  return names[index] || '?'
}
