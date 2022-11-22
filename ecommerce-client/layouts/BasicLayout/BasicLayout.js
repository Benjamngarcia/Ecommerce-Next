// import { createRef } from "react";
import { Container } from "semantic-ui-react"
import classNames from "classnames"
import Header from "../../components/Header"

export default function BasicLayout(props) {
    const { children, className } = props;

    return (
        <Container fluid className={classNames("basic-layout", {
            [className]: className
        })}>
            <Header/>
            {/* page content */}
            <Container className='content'>
                {children}
            </Container>
        </Container>
    )
}
