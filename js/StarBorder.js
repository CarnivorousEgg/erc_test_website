import './StarBorder.css';

export function createStarBorder({
  tag = 'div',
  className = '',
  color = 'cyan',
  speed = '5s',
  thickness = 1,
  children,
  ...rest
}) {
  const el = document.createElement(tag);
  el.className = `star-border-container ${className}`;
  el.style.padding = `${thickness}px 0`;
  if (rest.style) {
    Object.assign(el.style, rest.style);
  }
  for (const [key, value] of Object.entries(rest)) {
    if (key !== 'style') el.setAttribute(key, value);
  }
  const borderBottom = document.createElement('div');
  borderBottom.className = 'border-gradient-bottom';
  borderBottom.style.background = `radial-gradient(circle, ${color}, transparent 10%)`;
  borderBottom.style.animationDuration = speed;
  const borderTop = document.createElement('div');
  borderTop.className = 'border-gradient-top';
  borderTop.style.background = `radial-gradient(circle, ${color}, transparent 10%)`;
  borderTop.style.animationDuration = speed;
  const inner = document.createElement('div');
  inner.className = 'inner-content';
  if (children instanceof HTMLElement) {
    inner.appendChild(children);
  } else if (typeof children === 'string') {
    inner.innerHTML = children;
  }
  el.appendChild(borderBottom);
  el.appendChild(borderTop);
  el.appendChild(inner);
  return el;
} 