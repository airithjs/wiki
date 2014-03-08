var create_post_table = new Migration({
	up: function() {
		this.create_table('posts',function(t){
			t.integer('id', {auto_increment: true}),
			t.integer('rev'),
			t.string('title'),
			t.string('userid'),
			t.text('doc'),
			t.primary_key('id')
		});
		this.add_index('posts', 'title');
	},
	down: function() {
		this.drop_table('posts');
	}
});