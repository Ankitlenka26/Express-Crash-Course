const express = require("express");
const uuid = require("uuid");
const members = require("../../Members");
const router = express.Router();

// Gets all the members of the function
router.get("/", (req, res) => res.json(members));

//Get Single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    // we do not have a element of this id so we should return 400 which means it is a bad request
    // we also provide a message saying Member is not found
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Create Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "please include a name and a email" });
  }
  members.push(newMember);

  res.json(members);
});

// Update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;
        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    // we do not have a element of this id so we should return 400 which means it is a bad request
    // we also provide a message saying Member is not found
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// delete member

router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "Member Deleted ",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    // we do not have a element of this id so we should return 400 which means it is a bad request
    // we also provide a message saying Member is not found
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
