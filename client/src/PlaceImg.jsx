

export const PlaceImg = ({place, index=0, className=null}) => {

    if(!place.photos?.length) {
        return ''
    } else {
        if(!className) {
            className = 'object-cover'
        }
        return (
            <img className={className} src={'http://localhost:4000/uploads/'+place.photos[index]} alt= ""/>
        )
    }
}
