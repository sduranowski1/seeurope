import './LinksListWithImages.scss';
import {useNavigate} from "react-router-dom";

export const LinksListWithImages = (props) => {
    const navigate = useNavigate();

    const handleNavigation = (slug) => {
        navigate(`${slug}`);
    };

    return (
        <div className={'links-container'}>
            { props.data.map(product => {
                const el = <picture>
                    <img src={product.imgUrl} />
                </picture>;
                return (
                    <div
                        className={'link'}
                        onClick={() => handleNavigation(product.slug)} // Navigate on click
                        style={{ cursor: 'pointer' }}
                    >
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