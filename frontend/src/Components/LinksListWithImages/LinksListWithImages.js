import './LinksListWithImages.scss';
import {useNavigate} from "react-router-dom";
import i18n from "i18next";

export const LinksListWithImages = (props) => {
    const navigate = useNavigate();
    console.log(props)

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
                            {/*{product.name}*/}
                            {i18n.language === 'en' ? (
                                product.name
                            ) : i18n.language === 'pl' ? (
                                product.polishName
                            ) : (
                                product.germanName
                            )}
                        </p>
                    </div>
                )
            })}
        </div>
    );
}