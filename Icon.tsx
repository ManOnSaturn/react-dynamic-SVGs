import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { SVGInjector } from '@tanem/svg-injector';

export interface colorList {
  first: string;
  second?: string;
  third?: string;
}

const getIconWithColor = (icon, colorList: colorList) => {
  icon = icon.replaceAll('#E2E2E2', colorList.first);
  icon = icon.replaceAll('#00524D', colorList.second);
  return `url('data:image/svg+xml;utf8,${encodeURIComponent(icon)}')`;
};

function getStyle(props: { $background: any; $hoverBackground?: any }) {
  const styles = {
    background: props.$background,
  };
  if (props.$hoverBackground) {
    styles.background = `${props.$hoverBackground} !important`;
  }
  return styles;
}

const IconDiv = styled.div<{ $background: string; $hoverBackground?: string }>`
  ${(props) => {
    return getStyle(props);
  }};
`;

export const Icon: React.FC<{
  src: string;
  colors: {
    active: colorList;
    hover?: colorList;
    focus?: colorList;
    disabled?: colorList;
  };
  triggeringObj?: React.RefObject<any>;
  size?: string;
}> = ({ src, triggeringObj, size = '100%', ...rest }) => {
  const colors = useRef(rest.colors);
  const [svg, setSvg] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const background = getIconWithColor(svg, colors.current.active);
  const hoverBackground = getIconWithColor(svg, colors.current.hover);

  React.useLayoutEffect(() => {
    const nonReactiveElement = document.createElement('svg');
    nonReactiveElement.dataset.src = src;
    SVGInjector(nonReactiveElement, {
      beforeEach: (result) => {
        if (svg === '') {
          setSvg(
            `<svg viewBox="0 0 ` +
              result.viewBox.baseVal.width +
              ` ` +
              result.viewBox.baseVal.height +
              `" fill="none" xmlns="http://www.w3.org/2000/svg">${result.innerHTML}</svg>`
          );
        }
      },
    });
    return () => {};
  }, []);

  const onEnter = () => {
    setIsHovered(true);
  };
  const onLeave = () => {
    setIsHovered(false);
  };

  React.useEffect(() => {
    if (triggeringObj) {
      if (colors.current.hover) {
        triggeringObj.current.addEventListener('mouseenter', onEnter);
        triggeringObj.current.addEventListener('mouseleave', onLeave);
      }
    }
    return () => {
      if (triggeringObj) {
        if (colors.current.hover) {
          triggeringObj.current.removeEventListener('mouseenter', onEnter);
          triggeringObj.current.removeEventListener('mouseleave', onLeave);
        }
      }
    };
  }, [triggeringObj]);

  // Define effects when a triggering object is not specified
  const hoverEffect = !triggeringObj && {
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
  };

  return (
    <>
      <IconDiv
        $background={background}
        $hoverBackground={isHovered ? hoverBackground : null}
        style={{
          width: size,
          height: size,
          backgroundRepeat: 'no-repeat',
        }}
        {...hoverEffect}
      />
    </>
  );
};
