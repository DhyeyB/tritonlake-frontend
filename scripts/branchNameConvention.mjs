import { execSync } from "child_process"
const checkRemoteBranch = (branchName) => {
    try {
        execSync(`git show-branch remotes/origin/${branchName}`).toString()
        return true
    } catch (error) {
        console.error(`remote branch sync error${error}`)
        return false
    }
}

;(() => {
    const branchName = execSync("git rev-parse --abbrev-ref HEAD").toString()
    console.log("BranchName =======>", branchName)
    const isInRemote = checkRemoteBranch(branchName)
    if (!isInRemote) {
        const validBranchPrefix = "feature|hotfix|docs|bugfix|style|refactor|perf"
        const validBranchesRegex = new RegExp(`^(${validBranchPrefix})\/[\\w.-]+$`)
        if (!validBranchesRegex.test(branchName.trim())) {
            const msg = `Branch names in this project must adhere to this contract: ${validBranchPrefix}.`
            console.error(msg)
            process.exit(1)
        }
        console.log(`Valid Branch name: ${branchName}`)
    }
    console.log("Pre-commit: Branch convention check is successful")
})()
