const {expect} = require("chai");

describe.only("issue250 ", function () {


    it("demo not fixed ", async () => {
        console.log("step1:xxx")
        console.log("step2:xxx")
        console.log("step3:xxx")
        console.log("expected:xxx")
        expect("").to.be.equal("not xxx")
    })

    it("demo fixed", async () => {
        console.log("step1:xxx")
        console.log("step2:xxx")
        console.log("step3:xxx")
        console.log("expected:xxx")
        expect("").to.be.equal("")
    })
})