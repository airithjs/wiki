var create_old_post_table = new Migration({
	up: function() {
		this.create_table('old_posts',function(t){
			t.integer('id'),
			t.integer('rev'),
			t.string('title'),
			t.string('userid'),
			t.text('doc')
		});
		this.add_index('old_posts', 'id,rev');
		this.add_index('old_posts', 'title');
	},
	down: function() {
		this.drop_table('old_posts');
	}
});