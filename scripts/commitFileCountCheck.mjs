import { execSync } from "child_process"
// Check count of staged files.
;(() => {
    const totalFileCount = execSync("git diff --name-only --staged --format=oneline | wc -l").toString().trim()
    if (parseInt(totalFileCount) > 200) {
        console.error("Pre-commit: Less than or equal to 20 files are only allowed to commit - Current total count is: ", totalFileCount)
        process.exit(1)
    }
    console.log("Pre-commit: Total file count check is successful - Total file count", totalFileCount)
})()
