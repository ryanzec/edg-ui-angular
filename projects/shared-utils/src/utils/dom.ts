/**
 * Checks if an element is out of view of a container element
 * @param containerElement - The container element
 * @param checkElement - The element to check
 * @param offset - The offset to use in detection, defaults to 2 in order to account for issue that can arise when
 * scrolling an element with `scrollIntoView()` which can leave adjacent element slightly in view
 * @returns True if the element is out of view, false otherwise
 */
const isElementOutOfView = (containerElement: HTMLElement, checkElement: HTMLElement, offset: number = 2) => {
  const containerRect = containerElement.getBoundingClientRect();
  const elementRect = checkElement.getBoundingClientRect();

  // Check if the element is past the container's top boundary + offset
  const isPastTop = elementRect.bottom <= containerRect.top + offset;

  // Check if the element is past the container's bottom boundary - offset
  const isPastBottom = elementRect.top >= containerRect.bottom - offset;

  // Check if the element is past the container's left boundary + offset
  const isPastLeft = elementRect.right <= containerRect.left + offset;

  // Check if the element is past the container's right boundary - offset
  const isPastRight = elementRect.left >= containerRect.right - offset;

  return isPastTop || isPastBottom || isPastLeft || isPastRight;
};

const hasScrollableContent = (element: HTMLElement, direction: 'vertical' | 'horizontal' = 'vertical'): boolean => {
  if (direction === 'vertical') {
    return element.scrollHeight > element.clientHeight;
  }

  return element.scrollWidth > element.clientWidth;
};

export const domUtils = {
  isElementOutOfView,
  hasScrollableContent,
};
