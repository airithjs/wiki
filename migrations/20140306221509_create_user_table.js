var create_user_table = new Migration({
	up: function() {
		this.create_table('users', function(t){
			t.integer('id'),
			t.string('userid'),
			t.string('username'),
			t.string('password'),
			t.string('email')
			t.primary_key('id'),
			t.unique_key('userid')
		});
		this.add_index('users', 'userid');
		this.add_index('users', 'email');
	},
	down: function() {
		this.drop_table('users');
	}
});