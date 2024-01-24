function Grid() {
  return (
    <div className="grid grid-cols-12">
        <div className="col-span-2 bg-pink-300 h-screen">Container 1</div>
        <div className="col-span-8 bg-pink-500 h-screen">Container 2</div>
        <div className="col-span-2 bg-pink-300 h-screen">Container 3</div>
    </div>
  )
}

export default Grid