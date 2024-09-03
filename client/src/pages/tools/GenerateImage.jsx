
const GenerateImage = () => {
  return (
   <div>
  <header className="bg-white lg:px-32 ">
    <div className="container px-6 py-16 mx-auto">
      <div className="items-center lg:flex">
        <div className="w-full lg:w-1/2">
          <div className="lg:max-w-lg flex flex-col gap-4 items-center">
            <h1 className="text-red-500">** Image generation might take some time **</h1>
            <textarea className="border rounded-xl h-48 lg:h-80 p-4 w-full" placeholder="Enter prompt to generate image" name="" id=""></textarea>
            <button className="px-4 py-2 rounded-xl shadow-lg w-full bg-[#3373a0] text-white">Generate Image</button>
          </div>
        </div>
        <div className="flex items-center justify-center w-full rounded-xl mt-6 lg:mt-0 lg:w-1/2">
          <img className="w-full h-full lg:max-w-xl" src="https://blocksml.com/img/image_chat.png" alt="Catalogue-pana.svg" />
        </div>
      </div>
    </div>
  </header>
</div>

  )
}

export default GenerateImage
