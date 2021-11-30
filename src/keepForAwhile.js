// Taken from RecallArea:

/*
if (i < 13 ) {     // top row, for i = 0 to 12

    this.firstRow.push(
<div>
<div style={{zIndex: 5 , position: "absolute" , top: "40px" , left: `${20 + (i*71)}px` }}>
    <RecallCard />
</div>

<div style={{zIndex: 0 , position: "absolute" , top: "-30px" , left: `${41 + (i*71)}px` }}>
<RecallCardNumber
    numberText = {i+1}
/>
</div>
</div>
                       ) ;
            } // end if
*/
/*
if (i > 12 & i < 26 ) {    // second row, for i = 13 to 25
    this.secondRow.push(
<div>
<div style={{zIndex: 4 , position: "absolute" , top: "180px" , left: `${20 + ((i-13)*71)}px` }}>
    <RecallCard />
</div>
<div style={{zIndex: 0 , position: "absolute" , top: "110px" , left: `${33 + ((i-13)*71)}px` }}>
<RecallCardNumber
    numberText = {i+1}
/>
</div>
</div>
                        ) ;
          } // end if
*/
/*
if (i > 25 & i < 39 ) {    // third row, for i = 26 to 38
        this.thirdRow.push(
<div>
<div style={{zIndex: 3 , position: "absolute" , top: "320px" , left: `${20 + ((i-26)*71)}px` }}>
        <RecallCard />
</div>
<div  style={{zIndex: 0 , position: "absolute" , top: "232px" , left: `${33 + ((i-26)*71)}px` }}>>
    <RecallCardNumber
        numberText = {i+1}
    />
</div>
</div>
        ) ;
                      } // end if
*/

/*
if (i > 38 & i < 52 ) {     // borttom row, for i = 39 to 51
    this.fourthRow.push(
<div>
<div style={{zIndex: 2 , position: "absolute" , top: "460px" , left: `${20 + ((i-39)*71)}px` }}>
    <RecallCard
    top = "340px"
    left = {20 + (i-39)*71}
    />
</div>
<div  style={{zIndex: 0 , position: "absolute" , top: "371px" , left: `${33 + ((i-39)*71)}px` }}>>
    <RecallCardNumber
        numberText = {i+1}
    />
</div>
</div>
                        ) ;
                          } // end if
*/

// ----------// ----------// ----------// ----------// ----------// ----------//
