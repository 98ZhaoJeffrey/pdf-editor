import React from 'react'

const Card = () => {
    return (
        <>
            <div className="w-[22.5rem] rounded shadow-lg m-5 h-1/2 overflow-y-scroll">
                <img className="w-full max-h-64" src="https://fileinfo.com/img/ss/lg/txt_109.jpg" alt="Sunset in the mountains" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                        <p className="text-gray-700 text-base whitespace-normal break-words">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quiasadasdddddddddddd
                            dddddddddddddddds sad asd.
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <button className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Download</button>
                        <button className="inline-block bg-purple-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Edit</button>
                    </div>
            </div>
        </>
    )
}
export default Card
