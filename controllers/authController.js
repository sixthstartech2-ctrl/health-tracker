const supabase = require("../config/supabaseClient");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  const { data, error } = await supabase
    .from("users")
    .insert([{ username, email, password }])
    .select();

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  res.status(201).json({ success: true, user: data[0] });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (data.password !== password) {
    return res.status(401).json({ success: false, message: "Incorrect password" });
  }

  res.status(200).json({ success: true, message: "Login successful", user: data });
};
