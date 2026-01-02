const supabase = require("../config/supabaseClient");

exports.createActivity = async (req, res) => {
  const { userId, activityType, description, duration, calories } = req.body;

  const { data, error } = await supabase
    .from("health_activities")
    .insert([{
      user_id: userId,
      activity_type: activityType,
      description,
      duration,
      calories
    }])
    .select();

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  res.status(201).json({ success: true, activity: data[0] });
};

exports.getActivity = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("health_activities")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(404).json({ success: false, message: "Activity not found" });
  }

  res.status(200).json({ success: true, activity: data });
};

exports.updateActivity = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("health_activities")
    .update(req.body)
    .eq("id", id)
    .select();

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  res.status(200).json({ success: true, activity: data[0] });
};

exports.deleteActivity = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("health_activities")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  res.status(200).json({ success: true, message: "Activity deleted successfully" });
};
