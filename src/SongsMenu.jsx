import Songs from './Songs.js'

function SongsMenu({onSongSelect}){
const handleChangeSong = (e) => {
    console.log('Selected song value:', e.target.value);
onSongSelect(e.target.value)
}

const menu = Songs.map(element => {
    return (
<option value = {element.src} key={element.id}>{element.title}</option>
    )
});
return (
    <select onChange={handleChangeSong}>{menu}</select>
)
}

export default SongsMenu;