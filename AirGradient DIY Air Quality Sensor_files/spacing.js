window.addEventListener("load", function () {
    if (window.innerWidth > 768) {
        const rightSideElements = document.querySelectorAll('.features-right-side');
        const leftSideElements = document.querySelectorAll('.features-left-side');
        rightSideElements.forEach(function (rightSide, index) {
            let leftSide = leftSideElements[index];
            const rightSideItems = rightSide.querySelectorAll('.feature-item');
            const leftSideItems = leftSide.querySelectorAll('.feature-item');

            if (rightSideItems.length > 1) {
                if (rightSideItems.length === 2) {
                    setMarginBottomForItems(leftSideItems[0], rightSideItems[0]);
                } else {
                    rightSideItems.forEach(function (rightSideItem, index) {
                        let leftSideItem = leftSideItems[index];
                        setMarginBottomForItems(leftSideItem, rightSideItem);
                    })
                }
            }
        })

        function setMarginBottomForItems(leftItem, rightItem) {
            let leftSideItemHeight = leftItem.scrollHeight;
            let rightSideItemHeight = rightItem.scrollHeight;
            if (rightSideItemHeight < leftSideItemHeight) {
                rightItem.style.marginBottom = 40 + (leftSideItemHeight - rightSideItemHeight) + 'px';
            } else if (rightSideItemHeight > leftSideItemHeight) {
                leftItem.style.marginBottom = 40 + (rightSideItemHeight - leftSideItemHeight) + 'px';
            }
        }
    }
});
