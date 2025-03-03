/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSObjectWithLabel } from "react-select"

export const BASE_API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}`
export const FILE_TYPE = {
    IMAGE: {
        "image/png": [".png"],
        "image/jpeg": [".jpeg"],
        "image/jpg": [".jpg"],
    },
    VIDEO: {
        "video/mp4": [".mp4"],
        "video/mpeg": [".mpeg"],
        "video/quicktime": [".mov"],
        "video/webm": [".webm"],
    },
    PDF: {
        "application/pdf": [".pdf"],
    },
    CSV: {
        "text/csv": [".csv"],
    },
    XLSX: {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
    DOC: {
        "application/msword": [".doc"],
    },
    DOCX: {
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    AUDIO: {
        "audio/mpeg": [".mp3"],
        "audio/wav": [".wav"],
    },
}

export const FILE_SIZE_TYPE = {
    MB: 1024,
}

export const CONFIG = {
    STATUS_CODES: {
        UNAUTHORIZED: 401,
        NO_CONTENT: 204,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        SERVER_ERROR: 500,
    },
    AUTH_TOKEN_EXP: "auth_token_exp",
    PARAMS: {
        REDIRECT_URL_PARAM: "next",
    },
    PAGE_SIZE_OPTIONS: { 12: 12, 24: 24, 48: 48, 96: 96 },
    PAGINATION: {
        PAGE: 1,
        SIZE: 12,
        TYPE: "page",
    },
    SET_ALL_VALUE: "All",
    MESSAGES: {
        GENERIC_ERROR: "Something went wrong",
        NOT_FOUND: "Not found",
        SUCCESS: "Details updated successfully",
        INVITATION_SUCCESS: "Invitation sent successfully",
        NO_RECORDS_FOUND: "No records found in the uploaded file",
        USER_ADDED_SUCCESSFULLY: "User Added Successfully",
        PASSWORD_ADDED_SUCCESSFULLY: "Password updated successfully",

        CONFIRM_DELETE_IMAGE: "Are you sure you want to delete this Image?",
        FILE_UPLOAD_WARNING: "Are you sure you want to continue without uploading attached file? ",
        YOU_HAVE_SUCCESSFULLY_LOGGED_IN: "You have successfully logged in!",
        ONLY_XLSX_ACCEPTED: "only .xlsx file are accepted",
        ONLY_PDF_FILES_ACCEPTED: "only .pdf file are accepted",
        METADATA_ADDED_SUCCESSFULLY: "Metadata added successfully",
        DETAILS_ADDED_SUCCESSFULLY: "Details added successfully",
        SYSTEM_SETTINGS_UPDATED_SUCCESSFULLY: "System settings updated successfully",
        ADD_NOTES_FILE_ACCEPTED_ERROR: "only pdf, image or doc file is accepted",
        PDF_FILE_ACCEPTED: "Allows .pdf files",
        MP3_OR_WAV_FILE_ACCEPTED: "Allows .mp3 or .wav",
        INVALID_FILE_TYPE: "Invalid file type",
        LAB_ADDED_SUCCESSFULLY: "Lab added successfully",
        CONFIRM_DELETE_FILE: "Are you sure you want to delete this File?",

        THIS_CAN_NOT_BE_UNDONE: "This can not be undone.",
        CONFIRM_SIGNOUT: "Are you sure you want to Sign Out?",
        CLONED: "Details cloned successfully",
        INVALID_PHONE_NUMBER: {
            message: "Invalid phone number",
            path: ["phone_number"], // This specifies where the error message should be placed
        },
        ARE_YOU_SURE_DELETE: "Are you sure, you want to delete ",
        NOTES_ADDED_SUCCESSFULLY: "Notes added successfully",
        ONLY_PDF_ACCEPTED: "only .pdf files are accepted",
        ONLY_PDF_AND_DOCX_ACCEPTED: "Only PDF and Word files are supported",
        ONLY_IMAGE_ACCEPTED: "Only image file is accepted",
        ADD_CONTRACT_FILE_ACCEPTED_ERROR: "only pdf or doc file is accepted",
        MAX_SIZE_5_MB: "You can only upload file up to 5 MB",
        TEN_FILES: "You can only upload 10 files",
        CUSTOMER_ACTIVATE: "Customer activated successfully",
        CUSTOMER_DEACTIVATE: "Customer deactivated successfully",
        RESET_LINK_SENT: "If we find an account with this emaill you will receive a link to reset password to this email.",
        FILE_DOWNLOADED_SUCCESSFULLY: "File downloaded successfully",
        FILE_UPLOADED_SUCCESSFULLY: "File(s) uploaded successfully",
        SAVE_DRAFT_SUCCESSFULLY: "Save draft successfully",
        RETRY_REQUEST_SENT: "Retry request sent successfully",
        TWO_FACTOR_SUCCESSFULLY: "2 Factor Authentication Method Activated",
        OPPORTUNITY_ADDED_SUCCESSFULLY: "Opportunity published successfully.",
        OPPORTUNITY_SAVED_AS_DRAFT_SUCCESSFULLY: "Opportunity saved as draft successfully.",
        OPPORTUNITY_SENT_SUCCESSFULLY: "Opportunity sent successfully.",

        PROFILE_BUILDER: {
            PUBLISHED: "Your Profile has been published.",
            SAVED_AS_DRAFT_SUCCESSFULLY: "Profile saved as draft successfully.",
        },

        DISTRIBUTE: {
            STICKY_HEADER_TITLE_DISTRIBUTE: "Direct Partners Income & Growth Fund - Distribute",
            STICKY_HEADER_TITLE_INTERESTED_AGENTS: "Direct Partners Income & Growth Fund - Interested Agents",
        },

        EXTERNAL_OPPORTUNITY: {
            PINNED: "Opportunity has been successfully added to your pinned list.",
            UNPINNED: "Opportunity has been removed from your pinned list.",
            INTEREST_REGISTERED: "Your interest has been registered, you can now chose to Mark for Fundraising",
            DECLINED: "You have declined this opportunity",
            MARK_FUNDRAISING: "Successfully marked for Fundraising",
        },
        MY_NETWORK_OPPORTUNITY: "My Network Opportunity",
    },
    DISCLAIMER: {
        TITLE: "Regulatory Disclaimer",
        MESSAGE:
            "TritonLake operates within the regulatory framework of the jurisdictions in which it conducts business. The information provided on TritonLake's website, products, and services is intended for informational purposes only and does not constitute financial, investment, legal, or regulatory advice.",
    },
    CODE: {
        INVALID_FILE_TYPE: "file-invalid-type",
        FILE_TOO_LARGE: "file-too-large",
    },
    VALIDATION: {
        MESSAGE: {
            MAX_NAME_LIMIT_255: "This field must be less than or equal to 255 characters",
            NUMERICAL_VALUES_REQUIRED: "Only numerical values are allowed",
            NUMERICAL_VALUE_RANGE_FROM_ONE_TO_MAX_INT_LIMIT: "Duration must be in range of 1 and 35791394",
            NUMERICAL_VALUE_RANGE_FROM_ONE_TO_MAX_ORDER_LIMIT: "Duration must be in range of 0 and 2147483647",
            METACRITIC_FORMAT_DESCRIPTION: "This field cannot be greater than 100 and can have max 2 digit after the decimal point.",
            IMDB_FORMAT_DESCRIPTION: "This field cannot be greater than 10 and can have max 2 digit after the decimal point.",
            ROTTEN_TOMATOES_AUDIENCE: "This field cannot be greater than 100 and can have max 2 digit after the decimal point.",
            ROTTEN_TOMATOES_CRITICS: "This field cannot be greater than 100 and can have max 2 digit after the decimal point.",
            USER_FIRST_NAME: "First Name can only contain alphabets single quotes, and spaces",
            USER_LAST_NAME: "Last Name can only contain alphabets single quotes, and spaces",
            USER_EMAIL_REQUIRED: "Email address is required",
            USER_PASSWORD: "Must contain a combination of letters, numbers and special character with one uppercase and lowercase character",
            PASSWORD_DO_NOT_MATCH: "Password do not match",
            INVALID_URL: "Invalid URL",
            OVERWRITE_EXISTING_TRANSLATION: "Overwrite existing translations is required",
            FILENAME_STRUCTURE_REQUIRED: "Filename structure is required",
            MAX_CHARACTERS: "must be in range of 0 and 2147483647",
            DYNAMIC_FILENAME_STRUCTURE_REQUIRED: "Dynamic filename structure is required",
            ALPHANUMERIC: "Only alphanumeric characters are allowed",

            POSTAL_CODE_MUST_BE_LESS_THAN_9_CHARACTER: "Postal code must not be more than 9 characters.",
            LINE_1_IS_REQUIRED: "Line 1 is required.",
            RAW_IS_REQUIRED: "Raw address is required.",
            CITY: "City is required.",
            COUNTRY_CODE_IS_REQUIRED: "Country code is required.",
            POSTAL_CODE_IS_REQUIRED: "Postal code is required.",
            SELECT_AN_ADDRESS_FROM_DROPDOWN: "Please select an address from the dropdown or enter it manually.",
            ADDRESS_IS_REQUIRED: "Address is required",
        },
        CHARACTER_LENGTH: {
            TWO_HUNDREAD_CHARACTERS: 200,
            TWO_FIFTY_FIVE_CHARACTERS: 255,
            THREE_HUNDREAD_CHARACTERS: 300,
            EIGHT_CHARACTERS: 8,
            FIVE_HUNDREAD_CHARACTERS: 500,
            ONE_HUNDREAD_CHARACTERS: 100,
            FIFTEEN_CHARACTERS: 15,
        },
        FIELD_NAME: {
            USER_FIRST_NAME: "First name",
            USER_LAST_NAME: "Last name",
            USER_FIRM_NAME: "Firm name",
            NETWORK: "Network",
            NETWORK_NAME: "Network name",
            PRIMARY_BRAND_COLOR: "Primary brand color",
            SECONDARY_BRAND_COLOR: "Secondary brand color",
            ISRC: "Sony ISRC",
            ROLE: "Role",
            LOG_NO: "Log no.",
            PRODUCTION_NO: "Production no.",
            SONG_TITLE: "Song Title",
            SYNOPSIS: "Synopsis",
            LOCAL_SYNOPSIS: "Local language synopsis",
            ORIGINAL_TITLE: "Original title",
            THIS_FIELD: "This field",
            JOB_TITLE: "Job title",
            TITLE: "Title",
            ARTIST_NAME: "Artist name",
            ALBUM_TITLE: "Album title",
            PODCAST_NAME: "Podcast name",
            PASSWORD: "Password",
            EMAIL: "Email",
            NAME: "Name",
            BIT_RATE: "Bit rate",
            LANGUAGE: "Language",
            TYPE: "Type",
            CATEGORY: "category",
            ASSET: "asset",
            URL: "URL",
            SCREENER_LINK: "Screener link",
            CONTACT_NAME: "Contact name",
            MPM_NUMBER: "MPM number",
            NOTES: "Notes",
            AWARD_OR_NOMIANTION: "Awards/Nomination",
            MICROSITE_LINK: "Microsite link",
            GENRE_NAME: "Genre name",
            NOTES_TITLE: "Notes title",
            REGION_NAME: "Region name",
            VAT_NO: "Vat no",
            HEAD_ACCOUNT_MANAGER: "Head account manger",
            COUNTRY: "Country",
            LOGO: "Logo",
            NETWORK_LOGO: "Network Logo",
            MSN: "MSN",
            OPERATOR: "Operator",
            SERVER: "Server",
            STATION: "Station",
            BATTERY_ID: "Battery IDs",
            BATTERIES: "Batteries",
            BATTERY_NO: "Battery Number",
            RIGHTS: "Rights",
            AIRCRAFT_TYPE: "Aircraft Type",
            SEATS: "Seats",
            FLIGHTS_PER_YEAR: "Flight per year",
            AIRCRAFT_NICKNAME: "Aircraft nickname",
            NOTICE_HEADING: "Notice heading",
            NOTICE: "Notice",
            SUBTITLE: "Subtitle",
            REGISTRATION_NO: "Registration no.",
            CODE: "Code",
            IATA_CODE: "IATA Code",
            ICAO_CODE: "ICAO Code",
            FORMAT_CODE: "Format code",
            FILE_FORMAT_TYPE: "File format type",
            EMR: "EMR",
            DOCUMENT_NAME: "Document name",
            MODEL_ID: "Model ID",
            DOCUMENT_ID: "Document ID",
            LEGAL_NAME: "Legal name",
            ADDRESS: "Address",
            CITY: "City",
            STATE: "State",
            POSTAL_CODE: "Postal code",
            RETENTION_DAYS: "Retention days",
            CUSTOMER: "Customer",
            DOC_TYPE: "Document Type",
            OUTPUT_PREFIX_NAME: "Output file name prefix ",

            CREATE_NETWORK: {
                LINE: "Address",
                CITY: "City",
                POSTAL_CODE: "Postal Code",
                COUNTRY_CODE: "Country Code",
            },
        },
    },
    TOASTER_OPTIONS: {
        SUCCESS: {
            duration: 6000,
            style: {
                maxWidth: 450,
                borderRadius: "10px",
            },
        },
        ERROR: {
            duration: 6000,
            style: {
                maxWidth: 450,
                borderRadius: "10px",
            },
        },
        HOLD: {
            duration: 6000,
            style: {
                maxWidth: 450,
                borderRadius: "10px",
                background: "#FFFF00",
                color: "#000",
            },
        },
    },
    COLOR_ARRAY: {
        colorArray: [
            "#FF6633",
            "#FFB399",
            "#00B3E6",
            "#E6B333",
            "#3366E6",
            "#999966",
            "#99FF99",
            "#B34D4D",
            "#80B300",
            "#809900",
            "#E6B3B3",
            "#6680B3",
            "#66991A",
            "#FF99E6",
            "#CCFF1A",
            "#FF1A66",
            "#E6331A",
            "#33FFCC",
            "#66994D",
            "#B366CC",
            "#4D8000",
            "#B33300",
            "#CC80CC",
            "#66664D",
            "#991AFF",
            "#E666FF",
            "#4DB3FF",
            "#1AB399",
            "#E666B3",
            "#33991A",
            "#CC9999",
            "#B3B31A",
            "#00E680",
            "#4D8066",
            "#809980",
            "#E6FF80",
            "#1AFF33",
            "#999933",
            "#FF3380",
            "#CCCC00",
            "#66E64D",
            "#4D80CC",
            "#9900B3",
            "#E64D66",
            "#4DB380",
            "#FF4D4D",
            "#99E6E6",
            "#6666FF",
        ],
    },
    DEBOUNCE_TIMEOUT: 500,
    WORD_SLICE_LIMIT: 50,
    USER_CARD_WORD_SLICE_LIMIT: 20,
    WORD_SLICE_LIMIT_TWENTY_FIVE: 25,
    DROPDOWN_LABEL_SLICE_LIMIT: 30,
    WORD_SLICE_LIMIT_FOURTY: 40,
    PLUGINS_JS_PATH: "../js/scripts.bundle.js",
    SWEETALERT_DELETE_OPTION: {
        text: "Are you sure you want to delete",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete",
        confirmButtonTextSecondary: "Yes",
        cancelButtonText: "Cancel",
    },
    SWEETALERT_LOGOUT_OPTION: {
        text: "Are you sure you want to Sign Out",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        confirmButtonTextSecondary: "Yes",
        cancelButtonText: "Cancel",
    },
    FIELD_IGNORE: {
        ARTIST: "__ARTIST__",
        ALBUM: "__ALBUM__",
    },
    SWEETALERT_SUCCESS_OPTION: {
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
    },
    SWEETALERT_DEACTIVATE_OPTION: {
        text: "Are you sure you want to deactivate",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Deactivate",
        confirmButtonTextSecondary: "Yes",
        cancelButtonText: "Cancel",
    },
    SWEETALERT_ACTIVATE_OPTION: {
        text: "Are you sure you want to activate",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Activate",
        confirmButtonTextSecondary: "Yes",
        cancelButtonText: "Cancel",
    },
    IMAGE_SIZE: {
        CARD: "160x160",
        TABLE_LIST: "50x50",
        USER_CARD: "65x65",
        MEDIA_IMAGES: "300x300",
        MEDIA_LIBRARY_IMAGES: "60x80",
        MEDIA_LIBRAY_CARD_IMAGES: "500x500",
        LOGGED_IN_USER_HEADER_IMAGE: "40x40",
        MEDIA_LIBRARY_INFO_HEADER: "108x160",
        DISTRIBUTOR_REVENUE_IMAGE: "60x60",
        DISTRIBUTOR_AVATAR: "125x125",
        DEFAULT: "100x100",
    },
    SWEETALERT_ERROR_OPTION: {
        icon: "error",
    },
    AUTH_PATH_ARRAY: ["/auth/signin", "/auth/forgot-password"],
    SWEETALERT_WARNING_OPTION: {
        icon: "warning",
    },
    USER_MENU_TIMEOUT: 1500,
    QUICK_SHARE_MENU_TIMEOUT: 500,
    SKELETON_CONFIGURATION: {
        SKELETON_ROWS_COUNT: 5,
        SKELETON_HEIGHT: 60,
    },
    OTP_INPUT_LENGTH: 5,
    REDIRECT_TIMEOUT: 500,
    INFO_TABS: {
        FILE_INFO: {
            label: "File Info",
            path: "info",
        },
        LANGUAGES: {
            label: "Languages",
            path: "languages",
        },
        METADATA: {
            label: "Metadata",
            path: "metadata",
        },
        PREVIEW: {
            label: "Preview",
            path: "preview",
        },
        IMAGES: {
            label: "Images",
            path: "images",
        },
        // SCHEDULE: {
        //     label: "Schedule",
        //     path: "schedule",
        // },
        // ANALYTICS: {
        //     label: "Analytics",
        //     path: "analytics",
        // },
        SEASONS: {
            label: "Seasons",
            path: "seasons",
        },
        EPISODES: {
            label: "Episodes",
            path: "episode",
        },
        PODCAST_EPISODES: {
            label: "Episodes",
            path: "podcast-episode",
        },
        ALBUMS: {
            label: "Albums",
            path: "albums",
        },
        SONGS: {
            label: "Songs",
            path: "songs",
        },
    },
    SAVE_AS_DRAFT: "Save as Draft",
    FILE_INFO_FORM_FIELD_NAME: {
        NAME: "name",
        DURATION: "duration",
        MPM_NUMBER: "mpm_number",
        RIGHTS: "rights",
        DIRECTOR: "director",
        MPAA: "mpaa",
        CAST: "cast",
        SYNOPSIS: "synopsis",
        LOCAL_SYNOPSIS: "local_synopsis",
        GENRES: "genres",
        THEATRICAL: "theatrical",
        IFE: "ife",
        DISTRIBUTOR: "distributor",
        LAB: "lab",
        VERSION: "version",
        ORIGIN_COUNTRY_CODE: "origin_country_code",
        LOG_NO: "log_no",
        AVAILABILITY: "availability",
        CATEGORY: "category",
        PROCUREMENT_CATEGORY: "procurement_category",
        WIRELESS: "wireless",
        DRM: "drm",
        IMDB: "imdb",
        METACRITIC_CRITICS: "metacritic_critics",
        ROTTEN_TOMATOES_AUDIENCE: "rotten_tomatoes_audience",
        ROTTEN_TOMATOES_CRITICS: "rotten_tomatoes_critics",
        DATE: "date",
        CREATOR: "creator",
        PRODUCTION_NO: "production_no",
        FEATURED_ARTISTS: "featured_artist",
        EXPLICIT: "explicit",
        ISRC: "isrc",
        PRODUCERS: "producer",
        HOSTS: "host",
        NARRATOR: "narrator",
        WRITER: "writer",
        COVER: "cover",
        FORM_HEADING: "form_heading",
        RIGHTS_IN: "rights_in",
        ADD_SYNOPSIS_LANGUAGE: "add_synopsis_language",
        EDIT_NOTES: "edit_notes",
        NOTE: "note",
        AWARD: "award",
        FILE: "file",
        LANGUAGE: "language",
        LANGUAGES: "languages",
        SOURCE_LANGUAGE: "source_language",
        FILE_LABEL: "file_label",
        RIGHTS_INFORMATION: "rights_information",
        ORDER_NO: "order_no",
    },

    API_ENDPOINTS: {
        LOGIN: new URL(`${BASE_API_ENDPOINT}/user/login`),
        MFA_LOGIN: new URL(`${BASE_API_ENDPOINT}/user/login/code`),
        SIGNUP: new URL(`${BASE_API_ENDPOINT}/user/signup`),
        FILES: new URL(`${BASE_API_ENDPOINT}/files`),
        LOGOUT: new URL(`${BASE_API_ENDPOINT}/user/logout`),
        REQUEST_RESET_PASSWORD: new URL(`${BASE_API_ENDPOINT}/user/request-reset-password`),
        RESET_PASSWORD: new URL(`${BASE_API_ENDPOINT}/user/reset-password`),
        IMAGES: new URL(`${BASE_API_ENDPOINT}/images`),
        USER_INFO: new URL(`${BASE_API_ENDPOINT}/user/info`),
        BULK_UPLOADS: new URL(`${BASE_API_ENDPOINT}/bulk-uploads`),

        REFRESH_TOKEN: new URL(`${process.env.NEXT_PUBLIC_API_URL}/user/refresh-token`),
        EMR: {
            LIST: new URL(`${BASE_API_ENDPOINT}/emr/search`),
        },

        NETWORK: {
            LIST: new URL(`${BASE_API_ENDPOINT}/networks`),
            INVITE: new URL(`${BASE_API_ENDPOINT}/create-firm`),
        },
        FIRM: new URL(`${BASE_API_ENDPOINT}/firms`),
        AGENT: {
            LIST: new URL(`${BASE_API_ENDPOINT}/agents`),
        },

        OPPORTUNITY_FORM: {
            DROPDOWN_LIST: new URL(`${BASE_API_ENDPOINT}/tags`),
            CURRENCY_DROPDOWN: new URL(`${BASE_API_ENDPOINT}/currencies`),
            KEY_CONTACT: new URL(`${BASE_API_ENDPOINT}/contacts`),
            ADD_OPPORTUNITY: new URL(`${BASE_API_ENDPOINT}/opportunities`),
            QUICK_SEARCH: new URL(`${BASE_API_ENDPOINT}/opportunity-requests`),
        },
        OPPORTUNITY: {
            LIST: new URL(`${BASE_API_ENDPOINT}/opportunities`),
            FILTER_LIST: new URL(`${BASE_API_ENDPOINT}/opportunities/filters`),
            CLONE: new URL(`${BASE_API_ENDPOINT}/opportunities/clone`),
        },

        DISTRIBUTE: {
            OPPORTUNITY: new URL(`${BASE_API_ENDPOINT}/proposals`),
        },

        DASHBOARD: {
            GET: new URL(`${BASE_API_ENDPOINT}/dashboard`),
        },
        TWO_FACTOR: {
            SEND_VERIFICATION: new URL(`${BASE_API_ENDPOINT}/mfa/email/activate`),
            VERIFY: new URL(`${BASE_API_ENDPOINT}/mfa/email/activate/confirm`),
        },

        PROFILE_BUILDER: {
            LIST: new URL(`${BASE_API_ENDPOINT}/firms`),
        },
    },
    FILE_OUTPUT_TYPE: {
        SQL: "SQL",
    },
    FILTE_KEYS: {
        EMR: "EMR__name",
        CUSTOMER: "Customer__legal_name",
        DOC_TYPE: "DocumentType__name",
    },
    DUB_OR_SUB_FORM_FIELD: {
        LANGUAGE: "language",
        STATUS: "status",
        ASPECT_RATIO: "aspect_ratio",
        BIT_RATE: "bit_rate",
        ENCODING: "encoding",
        SYSTEMS: "systems",
        SUB_TYPE: "sub_type",
    },

    DISTRIBUTOR: {
        INFO_TABS: {
            CONTACTS: { label: "Contacts", path: "contacts" },
            // REVENUE: { label: "Revenue", path: "revenue" },
            // POS: { label: "POs", path: "pos" },
            // RATES: { label: "Rates", path: "rates" },
            NOTES: { label: "Notes", path: "notes" },
        },
    },
    INCREASED_SIZE_VALUE_KEY: ["file_name", "name", "legal_name", "customer_name", "first_name"],
    ERROR_OPTION: {
        label: "Error",
        value: "Error",
        data: {
            label: "Error",
            value: "Error",
        },
    },
    OUTPUT_PREFIX_VALID_PLACEHOLDERS: ["{PHN}", "{Datestamp}"],
    NOT_CAPITALIZE: ["url", "user_email", "email"],
    YEAR_DATA: [
        {
            label: "2024",
            value: "2024",
            data: { label: "2024", value: "2024" },
        },
        {
            label: "2023",
            value: "2023",
            data: { label: "2023", value: "2023" },
        },
        {
            label: "2022",
            value: "2022",
            data: { label: "2022", value: "2022" },
        },
        {
            label: "2021",
            value: "2021",
            data: { label: "2021", value: "2021" },
        },
    ],
    SIGN_IN_TITLE: "Sign In to TritonLake",
    RESET_PASSWORD: "Reset Password",
    FORGOT_PASSWORD_TITLE: "Forgot Password",
    TWO_FACTOR_AUTH_TITLE: "Two Factor Authentication",
    VERIFY_YOUR_ACCOUNT_TITLE: "Verify Your Account",
    MAX_INT_LIMIT: 35791394,
    MAX_ORDER_LIMIT: 2147483647,
    DROPDOWN_STYLE: {
        menu: (base: CSSObjectWithLabel) => ({ ...base, zIndex: "9" }),
        valueContainer: (base: CSSObjectWithLabel) => ({
            ...base,
            maxHeight: "37px",
            overflow: "auto",
        }),
        singleValue: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "#5e6278",
            fontWeight: 500,
            fontSize: "14px",
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        option: (base: CSSObjectWithLabel, state: any) => ({
            ...base,
            color: state.isDisabled && state.isSelected ? "#fff" : state.isDisabled ? "#808080" : state.isSelected ? "#fff" : "#000",
            ":hover": { backgroundColor: state.isSelected ? "#000" : "#DEEBFF" },
            backgroundColor: state.isSelected ? "#000" : "none",
            cursor: "pointer",
        }),
    },
    REACT_TABLE: {
        FIX_TABLE_DATA_COLUMN_SIZE: 100,
        TABLE_BUTTON_COLUMN_SIZE: 300,
        PODCAST_COLUMN_SIZE: 240,
        RUNTIME_SIZE: 200,
        BITRATE: 300,
    },
    LOCAL_STORAGE_VARIABLES: {
        ACCESS_TOKEN: "X-Auth-Access-Token",
        REFRESH_TOKEN: "X-Auth-Refresh-Token",
        USER_UUID: "USER-UUID",
        ROLE: "ROLE",
        MENU: "MENU",
        LOGGED_IN_CUSTOMER_OPTION: "LOGGED_IN_CUSTOMER_OPTION",
        USER_DETAILS: "USER_DETAILS",
        PREVIEW_DATA: "PREVIEW_DATA",
    },
    EXCLUDE_CUSTOMER_ROLES: ["CUSTOMER_SECONDARY_USER", "CUSTOMER_ADMIN"],
    TOKEN_EXPIRY_TIME: 120000,
    REFRESH_TOKEN_MEMOIZED_TIME: 10000,
    USER_TABS: {
        INFO: {
            label: "User Info",
            path: "info",
        },
        // permissions: {
        //     label: "Permissions",
        //     path: "permissions",
        // },
        // deputies: {
        //     label: "Deputies",
        //     path: "deputies",
        // },
    } as Record<string, any>,
    LOADER_TYPES: {
        TABLE_SKELETON: "table-skeleton",
        CARD_SKELETON: "card-skeleton",
    },
    DEFAULT_TABLE_SKELETON_ROW_COUNT: 4,
    CARD_SKELETON_BASIS: 95,
    CUSTOM_CARD_PAGES: {
        CONTACT: "contact",
        USER: "user",
        FLEET: "fleet",
    },
    CUSTOM_CARD_LABEL_NAME: {
        NAME: "name",
        EMAIL: "email",
        PRIMARY_DESCRIPTION: "primary_description",
        SECONDARY_DESCRIPTION: "secondary_description",
        PHONE_NUMBER: "phone_number",
        PAUSE_ACCOUNT: "pause_account",
        PRIMARY_CONTACT: "primary_contact",
        DELETE_BUTTON: "delete_button",
        VIEW_FULL_DETAILS: "view_full_details",
        Label_Value_DATA: "label_value_data,",
    },

    LOADING_BUTTON_TEXT: "Please wait...",
    FILE_TYPE_NAME: {
        IMAGE: "image",
        VIDEO: "video",
    },
    LAB: {
        INFO_TABS: {
            CONTACTS: { label: "Contacts", path: "contacts" },
            // RATES: { label: "Rates", path: "rates" },
            // DISTRIBUTORS: { label: "Distributors", path: "distributors" },
            NOTES: { label: "Notes", path: "notes" },
        },
    },
    DAYS: {
        ZERO: 0,
        ONE: 1,
        DAYS_IN_MONTH: 30,
        DAYS_IN_YEAR: 365,
    },
    SYSTEMS: {
        INFO_TABS: {
            CONTACTS: { label: "Contacts", path: "contacts" },
            // RATES: { label: "Rates", path: "rates" },
            FILENAMES: { label: "Filenames", path: "filenames" },
            // DISTRIBUTORS: { label: "Distributors", path: "distributors" },
            NOTES: { label: "Notes", path: "notes" },
        },
    },
    FILE_ICONS: {
        pdf: "/assets/media/svg/files/pdf.svg",
        png: "/assets/media/svg/files/blank-image.svg",
        jpg: "/assets/media/svg/files/blank-image.svg",
        jpeg: "/assets/media/svg/files/blank-image.svg",
        svg: "/assets/media/svg/files/blank-image.svg",
        webp: "/assets/media/svg/files/blank-image.svg",
        doc: "/assets/media/svg/files/doc.svg",
        docx: "/assets/media/svg/files/doc.svg",
    } as Record<string, string>,
    MAX_ROWS: 70,

    PDF_LEDGER_STATUS: {
        PENDING: "Pending",
        PROCESSING: "Processing",
        PROCESSED: "Processed",
        HUMAN_VERIFICATION_REQUIRED: "Human Verification Required",
        REPROCESSING: "Reprocessing",
        ERROR: "Error",
    },
    DASHBOARD_PIE_CHART_COLOR_MAPPING: {
        Error: "#F44336",
        "Human Verification": "#03A9F4",
        Pending: "#FF8D07",
        Processed: "#4CAF50",
    } as Record<string, string>,

    REDIRECT_PATHNAME: {
        DASHBOARD: "/",
        MANAGE_AGENTS: "/manage-agents",
        MANAGE_NETWORKS: "/manage-networks",
        OPPORTUNITIES: "/opportunities",
        EXTERNAL_OPPORTUNITIES: "/opportunities/external-opportunity",
        ADD_OPPORTUNITIES_ROUTE: "/opportunities/add-opportunity",
        PROFILE: "/profile",
        PROFILE_FIRST_TIME: "/profile-first-time",
        BUILD_PROFILE: "/build-profile",
        MY_DIRECTORY_PROFILE: "/my-directory-profile",
    },

    JODIT: {
        SHOW_BUTTONS: ["paragraph", "|", "bold", "italic", "link", "|", "ul", "ol", "|", "align", "undo", "redo"],
        REMOVE_BUTTONS: [
            "font",
            "fontsize",
            "brush",
            "table",
            "indent",
            "outdent",
            "cut",
            "copy",
            "paste",
            "print",
            "spellchecker",
            "fullscreen",
            "video",
            "image",
            "resize",
            "source",
            "about",
            "dots",
            "copy",
            "paste",
            "file",
            "preview",
            "fullsize",
            "lineHeight",
            "spellcheck",
            "formatting",
            "ai-assistant",
            "ai-commands",
            "speechRecognize",
            "symbols",
            "hr",
            "eraser",
            "find",
            "selectall",
            "subscript",
            "superscript",
            "copyformat",
            "classSpan",
            "separated",
            "sizemiddle",
        ],
    },

    ACTIVE_TAB: {
        KEY_INFO: "key_info",
        ABOUT: "about",
        TEAM: "team",
        TERMS: "terms",
        VEHICLE: "vehicle",
        KEY_DOCUMENTS: "key_documents",
        DISCLAIMERS: "disclaimers",
    },

    CONFIRMATION_DIALOG_CONSTANTS: {
        TITLE: "Do you want to save your progress?",
        TEXT: "If you choose to discard, you will lose all values entered so far.",
        CONFIRM_BUTTON_TEXT: "Save Draft",
        CANCEL_BUTTON_TEXT: "Discard Opportunity",
    },

    BUILD_YOUR_PROFILE: {
        TITLE: "Build Your Profile",
        PUBLISH_PROFILE: "Publish profile",
    },
}

export const OPEN_ENDPOINTS = [
    CONFIG.API_ENDPOINTS.LOGIN.href,
    CONFIG.API_ENDPOINTS.SIGNUP.href,
    CONFIG.API_ENDPOINTS.REQUEST_RESET_PASSWORD.href,
    CONFIG.API_ENDPOINTS.RESET_PASSWORD.href,
    CONFIG.API_ENDPOINTS.MFA_LOGIN.href,
]

export const CUSTOM_CARD_INFO = {
    [CONFIG.CUSTOM_CARD_PAGES.CONTACT]: {
        labelList: [CONFIG.CUSTOM_CARD_LABEL_NAME.NAME, CONFIG.CUSTOM_CARD_LABEL_NAME.PRIMARY_DESCRIPTION, CONFIG.CUSTOM_CARD_LABEL_NAME.PRIMARY_CONTACT, CONFIG.CUSTOM_CARD_LABEL_NAME.DELETE_BUTTON],
    },
    [CONFIG.CUSTOM_CARD_PAGES.USER]: {
        labelList: [CONFIG.CUSTOM_CARD_LABEL_NAME.NAME, CONFIG.CUSTOM_CARD_LABEL_NAME.PRIMARY_DESCRIPTION, CONFIG.CUSTOM_CARD_LABEL_NAME.EMAIL, CONFIG.CUSTOM_CARD_LABEL_NAME.PHONE_NUMBER],
    },
    [CONFIG.CUSTOM_CARD_PAGES.FLEET]: {
        labelList: [
            CONFIG.CUSTOM_CARD_LABEL_NAME.NAME,
            CONFIG.CUSTOM_CARD_LABEL_NAME.PRIMARY_DESCRIPTION,
            CONFIG.CUSTOM_CARD_LABEL_NAME.SECONDARY_DESCRIPTION,
            // CONFIG.CUSTOM_CARD_LABEL_NAME.VIEW_FULL_DETAILS,
            CONFIG.CUSTOM_CARD_LABEL_NAME.DELETE_BUTTON,
            CONFIG.CUSTOM_CARD_LABEL_NAME.Label_Value_DATA,
        ],
    },
}

export const OPPORTUNITY = {
    TABS: [
        { label: "All", href: "", isActive: true, value: "" },
        { label: "Live", href: "", value: "distributed" },
        { label: "Drafts", href: "", value: "draft" },
        { label: "Pending Distribution", href: "", value: "pending_distribution" },
        { label: "QuickShares", href: "", value: "quick_share", type: "quick_share" },
        { label: "QuickSearches", href: "", value: "quick_search", type: "quick_search" },
        { label: "Expired", href: "", value: "expired" },
        { label: "Archived", href: "", value: "archived" },
    ],
    SORTING_OPTIONS: [
        { value: "sponsor_name", label: "Sponsor Name A - Z", data: { value: "sponsor_name", label: "Sponsor Name A - Z" } },
        { value: "-sponsor_name", label: "Sponsor Name Z - A", data: { value: "-sponsor_name", label: "Sponsor Name Z - A" } },
        { value: "name", label: "Opportunity Name A - Z", data: { value: "name", label: "Opportunity Name A - Z" } },
        { value: "-name", label: "Opportunity Name Z - A", data: { value: "-name", label: "Opportunity Name Z - A" } },
        { value: "estimated_close_date", label: "Days Left (Low to High)", data: { value: "estimated_close_date", label: "Days Left (Low to High)" } },
        { value: "-estimated_close_date", label: "Days Left (High to Low)", data: { value: "-estimated_close_date", label: "Days Left (High to Low)" } },
        { value: "-created_at", label: "Created Date (New to Old)", data: { value: "-created_at", label: "Created Date (New to Old)" } },
        { value: "created_at", label: "Created Date (Old to New)", data: { value: "created_at", label: "Created Date (Old to New)" } },
    ],
    PROPOSALS_SORTING_OPTIONS: [
        { value: "opportunity__sponsor_name", label: "Sponsor Name A - Z", data: { value: "opportunity__sponsor_name", label: "Sponsor Name A - Z" } },
        { value: "-opportunity__sponsor_name", label: "Sponsor Name Z - A", data: { value: "-opportunity__sponsor_name", label: "Sponsor Name Z - A" } },
        { value: "opportunity__name", label: "Opportunity Name A - Z", data: { value: "opportunity__name", label: "Opportunity Name A - Z" } },
        { value: "-opportunity__name", label: "Opportunity Name Z - A", data: { value: "-opportunity__name", label: "Opportunity Name Z - A" } },
        { value: "opportunity__estimated_close_date", label: "Days Left (Low to High)", data: { value: "opportunity__estimated_close_date", label: "Days Left (Low to High)" } },
        { value: "-opportunity__estimated_close_date", label: "Days Left (High to Low)", data: { value: "-opportunity__estimated_close_date", label: "Days Left (High to Low)" } },
        { value: "-created_at", label: "Created Date (New to Old)", data: { value: "-created_at", label: "Created Date (New to Old)" } },
        { value: "created_at", label: "Created Date (Old to New)", data: { value: "created_at", label: "Created Date (Old to New)" } },
    ],
    STATUS_DRAFT: "draft",
    STATUS_PENDING_DISTRIBUTION: "pending_distribution",
    STATUS_LIVE: "live",
    STATUS_ACCEPTED: "accepted",
    STATUS_PUBLISHED: "published",
    STATUS_DISTRIBUTED: "distributed",
    STATUS_EXPIRED: "expired",
    STATUS_ARCHIVED: "archived",
    STATUS_DELETED: "deleted",
    STATUS_PENDING: "pending",
    STATUS_ACTIVE: "active",
    CREATE: "Create",
    EDIT: "Edit",

    TYPE: {
        QUICK_SHARE: "quick_share",
        QUICK_SEARCH: "quick_search",
        PLATFORM: "platform",
        ARCHIVED: "archived",
    },
}

export const CREATE_OPPORTUNITY = {
    TAX_ELIGIBILITY: [
        { value: "US_TAXABLE", label: "US TAXABLE", data: { value: "US_TAXABLE", label: "US TAXABLE" } },
        { value: "US_TAX_EXEMPT", label: "US TAX EXEMPT", data: { value: "US_TAX_EXEMPT", label: "US TAX EXEMPT" } },
        { value: "NON_US", label: "NON US", data: { value: "NON_US", label: "NON US" } },
    ],

    FUND_NUMBER: Array.from({ length: 30 }, (_, index) => ({
        value: `${index + 1}`,
        label: `${index + 1}`,
        data: { value: `${index + 1}`, label: `${index + 1}` },
    })),

    PAYMENT_FREQUENCY: [
        {
            value: "one_time_payment",
            label: "One Time Payment",
            data: { value: "one_time_payment", label: "One Time Payment" },
        },
        {
            value: "monthly",
            label: "Monthly",
            data: { value: "monthly", label: "Monthly" },
        },
        {
            value: "quarterly",
            label: "Quarterly",
            data: { value: "quarterly", label: "Quarterly" },
        },
        {
            value: "annually",
            label: "Annually",
            data: { value: "annually", label: "Annually" },
        },
    ],

    FUND_TYPE: [
        { value: "open-ended", label: "Open Ended", data: { value: "open-ended", label: "Open Ended" } },
        { value: "closed", label: "Closed", data: { value: "closed", label: "Closed" } },
    ],

    VINTAGE_YEAR: Array.from({ length: 2070 - 2020 + 1 }, (_, index) => {
        const year = (2020 + index).toString()
        return {
            value: year,
            label: year,
            data: { value: year, label: year },
        }
    }),
}

export const EXTERNAL_OPPORTUNITY = {
    TABS: [
        { label: "All", href: "", isActive: true, value: "" },
        { label: "Pinned", href: "", value: "" },
        { label: "Pending Response", href: "", value: "pending" },
        { label: "Interested", href: "", value: "accepted" },
        { label: "Fundraising", href: "", value: "fundraising" },
        { label: "QuickShares", href: "", value: "quick_share", type: "quick_share" },
        { label: "QuickSearches", href: "", value: "quick_search", type: "quick_search" },
    ],

    ACTIONS: {
        DECLINED: "declined",
        PINNED: "pinned",
        ACCEPTED: "accepted",
        FUNDRAISING: "fundraising",
    },
    ACTIONS_ARRAY: ["accepted", "fundraising"],
    PAGE: "page",
    EXTERNAL: "external",
}

export const DefaultIconDimensions = { width: "14", height: "14" }
