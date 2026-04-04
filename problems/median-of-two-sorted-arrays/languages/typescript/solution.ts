



function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const merged: number[] = [];

    let i = 0;
    let j = 0;
    // merge both arrays (like merge sort)
    while(i < nums1.length && j < nums2.length){
        if(nums1[i] < nums2[j]){
            merged.push(nums1[i])
            i++
        } else {
            merged.push(nums2[j]);
            j++
        }
    }





    // add remaining elements

    while (i < nums1.length) merged.push(nums1[i++]);
    while (j < nums2.length) merged.push(nums2[j++]);

    const n = merged.length;



    // if odd -> middle element
    if (n % 2 !== 0){
        return merged[Math.floor(n/2)];
    }



    // if even -> avarage of two middle elements
    return (merged[n/2 - 1] + merged[n / 2]) / 2;

};
