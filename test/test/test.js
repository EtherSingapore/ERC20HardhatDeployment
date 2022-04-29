const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Deploying the MyToken", function () {

    let myToken;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        const MyToken = await ethers.getContractFactory("MyToken");
        [owner, addr1, addr2] = await ethers.getSigners();
        myToken = await MyToken.deploy();
        await myToken.deployed();
    });

    it("Should successfully deploy", async function () {
        console.log("success!");
    });

    it("Should deploy with 1m of supply for the owner of the contract", async function () {
        const balance = await myToken.balanceOf(owner.address);
        expect(ethers.utils.formatEther(balance) == 1000000)
    });

    it("Should let you send tokens to another address", async function () {
        await myToken.transfer(addr1.address, ethers.utils.parseEther("100"));
        expect(await myToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("100"));
    });

    it("Should let you give another address the approval to send on your behalf", async function () {
        await myToken.connect(addr1).approve(owner.address, ethers.utils.parseEther("1000"));
        await myToken.transfer(addr1.address, ethers.utils.parseEther("1000"));
        await myToken.transferFrom(addr1.address, addr2.address, ethers.utils.parseEther("1000"));
        expect(await myToken.balanceOf(addr2.address)).to.equal(ethers.utils.parseEther("1000"));
    })

    it("Should assign the total supply of tokens to the owner", async function () {
        const ownerBalance = await myToken.balanceOf(owner.address);
        expect(await myToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should transfer tokens between accounts", async function () {
        // Transfer 500 tokens from owner to addr1
        await myToken.transfer(addr1.address, ethers.utils.parseEther("500"));
        const addr1Balance = await myToken.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(ethers.utils.parseEther("500"));

        // Transfer 500 tokens from addr1 to addr2
        // We use .connect(signer) to send a transaction from another account
        await myToken.connect(addr1).transfer(addr2.address, ethers.utils.parseEther("500"));
        const addr2Balance = await myToken.balanceOf(addr2.address);
        expect(addr2Balance).to.equal(ethers.utils.parseEther("500"));
    });

    it("Should update balances after transfers", async function () {
        const initialOwnerBalance = await myToken.balanceOf(owner.address);

        // Transfer 1000 tokens from owner to addr1.
        await myToken.transfer(addr1.address, ethers.utils.parseEther("1000"));

        // Transfer another 100 tokens from owner to addr2.
        await myToken.transfer(addr2.address, ethers.utils.parseEther("100"));

        // Check balances.
        const finalOwnerBalance = await myToken.balanceOf(owner.address);
        expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(ethers.utils.parseEther("1100")));

        const addr1Balance = await myToken.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(ethers.utils.parseEther("1000"));

        const addr2Balance = await myToken.balanceOf(addr2.address);
        expect(addr2Balance).to.equal(ethers.utils.parseEther("100"));
    });
});