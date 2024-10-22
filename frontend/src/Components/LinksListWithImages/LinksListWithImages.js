import './LinksListWithImages.scss';

export const LinksListWithImages = (props) => {
    return (
        <div className={'links-container'}>
            { props.data.map(product => {
                const el = <picture>
                    <img src={product.imgUrl} />
                </picture>;
                return (
                    <div className={'link'} >
                        <div className={'bg-change'} />
                        {product.imgUrl ? el : ''}
                        <p className={'link-name'} >
                            {product.name}
                        </p>
                    </div>
                )
            })}
        </div>
    );
}