const express = require("express");
const router = express.Router();

const { getNames,setNames,
    getOneName ,updateName,deleteName
} = require("../controllers/nameController");

// router.route('/:id').get(getOneName);

router.route('/').get(getNames).post(setNames);
router.route('/:id').get(getOneName).put(updateName).delete(deleteName);

module.exports = router;
