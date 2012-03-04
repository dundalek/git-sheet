
var command_data = {
"columngroups" : ["Create", "Revert", "Update", "Useful Commands"],
"items": [

{
    "label": "Create",
    "commands": [

    {
        "label": "From existing data",
        "class" : "graybox",
        "command": "cd $project_path\ngit init\ngit add ."
    }, {
        "label": "From existing repo",
        "commands": [{
            "command": "git clone $existing_repo $new_repo"
        }, {
            "command": "git clone git://host.org/project.git"
        }, {
            "command": "git clone ssh://you@host.org/prj.git"
        }]
    }

    ]
}, {
    "label": "Show",
    "commands": [

    {
        "label": "Files changed in working directory",
        "command": "git status"
    }, {
        "label": "Changes to tracked files",
        "class" : "graybox",
        "command": "git diff"
    }, {
        "label": "What changed between $ID1 and $ID2",
        "command": "git diff $id1 $id2"
    }, {
        "label": "History of changes",
        "command": "git log"
    }, {
        "label": "History of changes for file with diffs",
        "command": "git log -p $file $directory"
    }, {
        "label": "Who changed what and when in a file",
        "command": "git blame $file"
    }, {
        "label": "A commit identified by $ID",
        "class" : "graybox",
        "command": "git show $id"
    }, {
        "label": "A specific file from a specific $ID",
        "command": "git show $id:$file"
    }, {
        "label": "All local branches",
        "command": "git branch"
    }

    ]
}, {
    "label": "Revert",
    "commands": [

    {
        "label": "Return to the last committed state",
        "note": "! you cannot undo a hard reset !",
        "class" : "graybox",
        "command": "git reset --hard"
    }, {
        "label": "Revert the last commit",
        "note": "Creates a new commit",
        "command": "git revert HEAD"
    }, {
        "label": "Revert specific commit",
        "note": "Creates a new commit",
        "command": "git revert $id"
    }, {
        "label": "Fix the last commit",
        "note": "(after editing the broken files)",
        "command": "git commit -a --amend"
    }, {
        "label": "Checkout the $id version of a file",
        "command": "git checkout $id $file"
    }

    ]
}, {
    "label": "Branch ",
    "commands": [

    {
        "label": "Switch to the $id branch",
        "class" : "graybox",
        "command": "git checkout $id"
    }, {
        "label": "Merge branch1 into branch2",
        "class" : "graybox",
        "command": "git checkout $branch2\ngit merge $branch1"
    }, {
        "label": "Create branch named $branch based on the HEAD",
        "command": "git branch $branch"
    }, {
        "label": "Create branch $new_branch based on branch $other and switch to it",
        "class" : "graybox",
        "command": "git checkout -b $new_branch $other"
    }, {
        "label": "Delete branch $branch",
        "class" : "graybox",
        "command": "git branch -d $branch"
    }

    ]
}, {
    "label": "Update",
    "commands": [

    {
        "label": "Fetch latest changes from origin",
        "note": "(but this does not merge them).",
        "command": "git fetch"
    }, {
        "label": "Pull latest changes from origin",
        "class" : "graybox",
        "note": "(does a fetch followed by a merge)",
        "command": "git pull"
    }, {
        "label": "Apply a patch that some sent you",
        "note": "(in case of a conflict, resolve and use git am --resolved )",
        "command": "git am -3 $patchfile"
    }

    ]
}, {
    "label": "Publish",
    "commands": [

    {
        "label": "Commit all your local changes",
        "class" : "graybox",
        "command": "git commit -a"
    }, {
        "label": "Prepare a patch for other developers",
        "command": "git format-patch origin"
    }, {
        "label": "Push changes to origin",
        "class" : "graybox",
        "command": "git push"
    }, {
        "label": "Mark a version / milestone",
        "command": "git tag $tagname"
    }


    ]
}, {
    "label": "Useful Commands",
    "commands": [

    {
        "label": "Finding regressions",
        "class" : "graybox",
        "commands": [{
            "command": "git bisect start",
            "note": "(to start)"
        }, {
            "command": "git bisect good $id",
            "note": "($id is the last working version)"
        }, {
            "command": "git bisect bad $id",
            "note": "($id is a broken version)"
        }, {
            "command": "git bisect bad/good",
            "note": "(to mark it as bad or good)"
        }, {
            "command": "git bisect visualize",
            "note": "(to launch gitk and mark it)"
        }, {
            "command": "git bisect reset",
            "note": "(once you're done)"
        }]
    }, {
        "label": "Check for errors and cleanup repository",
        "command": "git fsck\ngit gc --prune"
    }, {
        "label": "Search working directory for $foo",
        "command": "git grep $foo"
    }

    ]
}, {
    "label": "Resolve Merge Conflicts",
    "commands": [

    {
        "label": "To view the merge conclicts",
        "commands": [{
            "command": "git diff",
            "note": "(complete conflict diff)"
        }, {
            "command": "git diff --base $file",
            "note": "(against base file)"
        }, {
            "command": "git diff --ours $file",
            "note": "(against your changes)"
        }, {
            "command": "git diff --theirs $file",
            "note": "(against other changes)"
        }]
    }, {
        "label": "To discard conflicting patch",
        "command": "git reset --hard\ngit rebase --skip"
    }, {
        "label": "After resolving conflicts, merge with",
        "commands": [{
            "command": "git add $conflicting_file",
            "note": "(do for all resolved files)"
        }, {
            "command": "git rebase --continue"
        }]
    }

    ]
}

]
};
