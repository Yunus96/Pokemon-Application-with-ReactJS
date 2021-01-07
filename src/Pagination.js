import React from 'react'

export default function Pagination({gotoNext, gotoPrev}) {
    return (
        <div>
            { gotoPrev && <button onClick={gotoPrev}>previous</button>}
            { gotoNext && <button onClick={gotoNext}>next</button>}
        </div>
    )
}
