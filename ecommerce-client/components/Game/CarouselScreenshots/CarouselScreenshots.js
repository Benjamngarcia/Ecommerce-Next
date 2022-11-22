import { useEffect, useState } from "react";
import { Image, Modal } from "semantic-ui-react";
import Slider from "react-slick";
import { map } from "lodash";

const settings = {
    className: "carousel-screenshots",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    swipeToSlider: true,
};

export default function CarouselScreenshots(props) {
    const { title, screenshots } = props;
    const [imgPrev, setImgPrev] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [urlImage, setUrlImage] = useState(null);

    const openImagen = (url) => {
        setUrlImage(url);
        setShowModal(true);
    };


    useEffect(() => {
        let screenArr = []
        console.log("🚀 ~ file: CarouselScreenshots.js ~ line 29 ~ useEffect ~ screenArr", screenArr)

        screenshots.map((screenshot) => {
            screenArr.push(screenshot.attributes)
            // console.log(screenArr)
            setImgPrev(screenArr || [])
        })
    }, [])


    return (
        <>
            <Slider {...settings}>
                {
                    imgPrev.map((imgP) => {
                        return (
                            <Image
                                key={imgP.id}
                                src={imgP.url}
                                alt={imgP.name}
                                onClick={() => openImagen(imgP.url)}
                            />
                        )
                    })
                }
            </Slider>
            <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
                <Image src={urlImage} alt={title} />
            </Modal>
        </>
    );
}