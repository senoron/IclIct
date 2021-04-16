public without sharing class RegisterController {

    public static final String COMMUNITY_ACCOUNT = '0010900000GDgDbAAL';
    public static final String PROFILE_ID = '00e09000001EfzXAAS';

	public RegisterController () {}

	private final Long CURRENT_TIME = Datetime.now().getTime();
    public String key {get; set;}
	public String Firstname {get; set;}
	public String email {get; set;}
	public String password {get; set {password = value == null ? value : value.trim(); } }
	public String confirmPassword {get; set { confirmPassword = value == null ? value : value.trim(); } }
	public String Lastname {get; set { Lastname = value == null ? value : value.trim(); } }
	public String e;

	public String getE () {
		return e;
	}

	public PageReference registerUser() {

		try{

            Key__c keyObj = getKeyByValue(key);

            if (keyObj == null) {
                return null;
            }   

            String userType = keyObj.Type__c;

            // User u = new User();

            // u.username = email;
            // u.Email = email;
            // u.FirstName = Firstname;
            // u.LastName = Lastname;
            // u.CommunityNickname = generateCommunityNickname();
            // u.ProfileId = PROFILE_ID;
            // u.IsTeacher__c = userType == 'Teacher' ? true : false;

            Account acc = new Account(Name = generateCommunityNickname());

			insert acc;

            Contact cont = new Contact(FirstName = Firstname, LastName = Lastname, Email = email, AccountId = acc.Id);

			insert cont;

            User portalUser = new User(
				ProfileId = PROFILE_ID,
				Username = email,
				Alias = 'sfdc',
				Email = email,
				EmailEncodingKey='UTF-8',
				Firstname=Firstname,
				Lastname=Lastname,
				LanguageLocaleKey='en_US',
				LocaleSidKey='en_US',
				TimeZoneSidKey='GMT',
				ContactId = cont.Id,
                IsTeacher__c = userType == 'Teacher' ? true : false
				);

            insert portalUser;

			System.setPassword(portalUser.ID, password);

            // String userId = Site.createPortalUser(u, COMMUNITY_ACCOUNT, password);

            if (portalUser.IsTeacher__c = false) {
                createStudent(keyObj, portalUser, portalUser.ID);
            } else {
                createTeacher(keyObj, portalUser, portalUser.Id);
            }

            return Site.login(email, password, null);
		} catch (Exception ex) {
			e = ex.getMessage();
		}
		return null;
	}

    private Teacher__c createTeacher(Key__c keyObj, User u, String userId) {

        Teacher__c teacher = new Teacher__c();

        teacher.School__c = keyObj.School__c;
        teacher.User__c = userId;
        teacher.Name = u.FirstName + ' ' + u.LastName;

        insert teacher;

        keyObj.IsUsed__c = true;

        update keyObj;

        return teacher;
    }

    private Student__c createStudent (Key__c keyObj, User u, String userId) {
        Student__c student = new Student__c();

        student.Name = u.FirstName + ' ' + u.LastName;
        student.Class__c = keyObj.Class__c;
        student.School__c = keyObj.School__c;
        student.User__c = userId;

        insert student;

        keyObj.IsUsed__c = true;

        update keyObj;

        return student;
    }

    private Key__c getKeyByValue(String value) {
        return [SELECT Id, Value__c, Class__c, School__c, Type__c FROM Key__c WHERE Value__c =: value AND IsUsed__c = false LIMIT 1];
    }

	private String generateCommunityNickname() {
		return 'ExternalUser' + CURRENT_TIME;
	}
}
