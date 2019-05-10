import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';

const items = [
  {
    src: 'https://sc01.alicdn.com/kf/HTB1R0uzbg685uJjSZFCq6xzlXXap.jpg',
    altText: 'MaretMantap',
    caption: 'MaretMantap'
  },
  {
    src: 'https://sc02.alicdn.com/kf/HTB18ttkXf2H8KJjy1zkq6xr7pXak.jpg',
    altText: 'MaretMantap',
    caption: 'MaretMantap'
  },
  {
    src: 'https://www.tokoalatfitness.com/wp-content/uploads/2018/10/TOKO-ALAT-FITNESS-RUBBER-FLOORING.jpg',
    altText: 'MaretMantap',
    caption: 'MaretMantap'
  },
  {
    src: 'https://www.tokoalatfitness.com/wp-content/uploads/2017/10/HEADER-GYMOST-500.jpg',
    altText: 'MaretMantap',
    caption: 'MaretMantap'
  },
  {
    src: 'https://www.tokoalatfitness.com/wp-content/uploads/2018/04/BANNER-PILATES.jpg',
    altText: 'MaretMantap',
    caption: 'MaretMantap'
  },
  {
    src: 'https://www.tokoalatfitness.com/wp-content/uploads/2018/04/BANNER-TREADMILL-KETTLER.jpg',
    altText: 'MaretMantap',
    caption: 'MaretMantap'
  },
  {
    src: 'https://www.tokoalatfitness.com/wp-content/uploads/2017/09/ultimate-nutrition-banner3-1.jpg',
    altText: 'MaretMantap',
    caption: 'MaretMantap'
  },
  {
    src: 'http://www.bfit.co.id//_assets/images/temp/1514611607_erzHrjiadxjpMZUBRi5Y.jpg',
    altText: 'MaretMantap',
    caption: 'MaretMantap'
  }
];

class CarouselKu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} height='350px' width='100%' />
          {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default CarouselKu;